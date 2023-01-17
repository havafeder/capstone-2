import React from "react";
import { render } from "@testing-library/react";
import InputTodo from "./InputTodo";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<InputTodo />
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});