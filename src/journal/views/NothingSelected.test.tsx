import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NothingSelectedView } from "./NothingSelected";

describe("<NothingSelected/>", () => {
  test("debe mostrar el texto correcto", () => {
    render(<NothingSelectedView />);

    const text = screen.getByText(/seleciona o crea una entrada/i);
    expect(text).toBeInTheDocument();
  });

  test("debe renderizar Typography con variante h5", () => {
    render(<NothingSelectedView />);

    const heading = screen.getByText(/seleciona o crea una entrada/i);
    expect(heading.tagName).toBe("H5");
  });

  test("debe renderizar con Grid2 container", () => {
    const { container } = render(<NothingSelectedView />);

    const gridContainer = container.querySelector(".MuiGrid2-root");
    expect(gridContainer).toBeInTheDocument();
  });
});
