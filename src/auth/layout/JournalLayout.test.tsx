import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { JournalLayout } from "./JournalLayout";

interface Props {
  drawerWidth: number;
  closeSideBar: () => void;
}

vi.mock("../../journal/components/NavBar", () => ({
  NavBar: ({ drawerWidth, closeSideBar }: Props) => (
    <div data-testid="navbar" data-drawer-width={drawerWidth}>
      <button onClick={closeSideBar} data-testid="close-sidebar-btn">
        Close Sidebar
      </button>
    </div>
  ),
}));

vi.mock("../../journal/components", () => ({
  SideBar: ({ drawerWidth }: Props) => (
    <div data-testid="sidebar" data-drawer-width={drawerWidth}>
      Sidebar Content
    </div>
  ),
}));

const setInnerWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("JournalLayout", () => {
  beforeEach(() => {
    setInnerWidth(1024);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("debe renderizar NavBar con drawerWidth correcto", () => {
    render(<JournalLayout>Content</JournalLayout>);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveAttribute("data-drawer-width", "240");
  });

  test("debe renderizar SideBar inicialmente", () => {
    render(<JournalLayout>Content</JournalLayout>);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("debe renderizar SideBar con drawerWidth correcto", () => {
    render(<JournalLayout>Content</JournalLayout>);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveAttribute("data-drawer-width", "240");
  });

  test("debe mostrar children correctamente", () => {
    render(
      <JournalLayout>
        <div>Mi contenido personalizado</div>
      </JournalLayout>
    );

    expect(screen.getByText("Mi contenido personalizado")).toBeInTheDocument();
  });

  test("debe ocultar SideBar al hacer click en closeSideBar", async () => {
    render(<JournalLayout>Content</JournalLayout>);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-sidebar-btn");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    });
  });

  test("debe mostrar/ocultar SideBar alternadamente", async () => {
    render(<JournalLayout>Content</JournalLayout>);

    const closeButton = screen.getByTestId("close-sidebar-btn");

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();

    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByTestId("sidebar")).not.toBeInTheDocument();
    });

    fireEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });
  });

  test("debe tener Box principal con flexGrow: 1", () => {
    const { container } = render(<JournalLayout>Content</JournalLayout>);

    const mainBox = container.querySelector("main");
    expect(mainBox).toBeInTheDocument();
  });

  test("debe añadir event listener de resize al montar", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");

    render(<JournalLayout>Content</JournalLayout>);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    addEventListenerSpy.mockRestore();
  });

  test("debe remover event listener de resize al desmontar", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<JournalLayout>Content</JournalLayout>);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });

  test("debe mostrar SideBar cuando width > 600", async () => {
    setInnerWidth(800);

    const { rerender } = render(<JournalLayout>Content</JournalLayout>);

    fireEvent.resize(window, { innerWidth: 800 });

    rerender(<JournalLayout>Content</JournalLayout>);

    await waitFor(() => {
      expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    });
  });

  test("debe tener estructura correcta: NavBar + (SideBar || div) + main", () => {
    const { container } = render(<JournalLayout>Content</JournalLayout>);

    const box = container.firstChild as HTMLElement;
    expect(box).toHaveStyle({ display: "flex" });

    const children = box.children;
    expect(children.length).toBeGreaterThanOrEqual(3);
  });

  test("closeSideBar debe ser pasado correctamente a NavBar", () => {
    render(<JournalLayout>Content</JournalLayout>);

    const closeButton = screen.getByTestId("close-sidebar-btn");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
  });
});
