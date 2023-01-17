import React from "react";
import { render } from "@testing-library/react";
import EditTodo from "./EditTodo";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<EditTodo todo='Be kind'/>
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});