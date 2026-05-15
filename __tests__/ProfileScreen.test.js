import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ProfileScreen from "../app/profile";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() =>
    Promise.resolve(
      JSON.stringify({
        username: "Harshad",
        email: "harshad@test.com",
        role: "Developer",
      })
    )
  ),
  removeItem: jest.fn(),
}));

describe("Profile Screen", () => {
  it("renders user information", async () => {
    const { getByText } = render(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText("Harshad")).toBeTruthy();

      expect(getByText("harshad@test.com")).toBeTruthy();

      expect(getByText("Developer")).toBeTruthy();
    });
  });

  it("renders logout button", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText("Logout")).toBeTruthy();
  });
});