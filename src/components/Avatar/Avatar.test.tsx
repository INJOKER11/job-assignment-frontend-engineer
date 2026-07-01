import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Avatar from "./Avatar";
import defaultAvatar from "../../assets/images/default-avatar.jpeg";

describe("Avatar", () => {
  it("renders provided avatar image", () => {
    render(
      <MemoryRouter>
        <Avatar username="john" img="https://example.com/avatar.jpg" />
      </MemoryRouter>
    );

    expect(screen.getByAltText("avatar")).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders placeholder when image is not provided", () => {
    render(
      <MemoryRouter>
        <Avatar username="john" img="" />
      </MemoryRouter>
    );

    expect(screen.getByAltText("avatar")).toHaveAttribute("src", defaultAvatar);
  });

  it("links to user profile", () => {
    render(
      <MemoryRouter>
        <Avatar username="john" img="" />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "/profile/john");
  });
});
