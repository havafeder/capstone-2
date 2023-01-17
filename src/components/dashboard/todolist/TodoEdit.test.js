import React from "react";
import { render } from "@testing-library/react";
import TodoEdit from "./EditTodo";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<TodoEdit todo='Be kind'/>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
