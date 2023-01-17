import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { MemoryRouter } from "react-router";

it("matches snapshot 1", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<Dashboard />
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});