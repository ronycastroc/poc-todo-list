import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainPage from "../components/MainPage";

beforeEach(cleanup);

function getInput() {
  return screen.getByPlaceholderText("Digite sua tarefa");
}

function getButton() {
  return screen.getByRole("form");
}

function getTask() {
  return screen.queryByText("teste");
}

function getTaskButton() {
  return screen.getByRole("button");
}

describe("<MainPage />", () => {
  test("renders a title", () => {
    render(<MainPage />)

    const title = screen.getByText("ToDoList.");

    expect(title).toBeInTheDocument();
  });

  test("renders an input", () => {
    render(<MainPage />)

    const input = getInput()

    expect(input).toBeInTheDocument();
  });

  describe("when the button is clicked", () => {
    test("renders a new task on the screen", () => {
      render(<MainPage />)

      const input = getInput();

      userEvent.clear(input);
      userEvent.type(input, "teste");

      const button = getButton();

      userEvent.click(button);

      const task = getTask();

      expect(task).toHaveTextContent("teste");
    });
  });

  describe("when the task is clicked", () => {
    test("renders a scratch on to the word", () => {
      render(<MainPage />);

      const buttonTask = getTaskButton();

      fireEvent.click(buttonTask);

      const input = getInput();

      userEvent.clear(input);
      userEvent.type(input, "teste");

      const button = getButton();

      userEvent.click(button);

      const task: any = getTask();

      userEvent.click(task);

      expect(task).toHaveStyle("text-decoration: line-through;");
    });
  });

  describe("when the task is deleted", () => {
    test("renders the screen with the task deleted", () => {
      render(<MainPage />);
      
      const buttonTask = getTaskButton();

      fireEvent.click(buttonTask);

      const input = getInput();

      userEvent.clear(input);
      userEvent.type(input, "teste");

      const button = getButton();

      userEvent.click(button);

      const buttonTasks = getTaskButton();

      userEvent.click(buttonTasks);

      const task = getTask();

      expect(task).not.toBeInTheDocument();
    });
  });
});

