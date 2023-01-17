import React from "react";
import { render } from "@testing-library/react";
import Fact from "./Fact";
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
	const { asFragment } = render(
		<MemoryRouter>
			<Fact />
		</MemoryRouter>,
	);
	expect(asFragment()).toMatchSnapshot();
});
