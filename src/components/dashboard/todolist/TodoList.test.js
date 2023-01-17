import React from "react";
import { render } from "@testing-library/react";
import TodoList from "./TodoList";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<TodoList allTodos='Walk dog' setTodosChange={true}/>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
