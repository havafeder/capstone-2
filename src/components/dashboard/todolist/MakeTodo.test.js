import React from "react";
import { render } from "@testing-library/react";
import MakeTodo from "./MakeTodo";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<MakeTodo />
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
