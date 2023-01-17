import React from "react";
import { render } from "@testing-library/react";
import ListTodos from "./ListTodos";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<ListTodos allTodos='Walk dog' setTodosChange={true}/>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});