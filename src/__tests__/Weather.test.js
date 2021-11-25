import React from "react";
import Weather from "../Weather";
import axios from "axios";
import { render, screen, act } from "@testing-library/react";
import { openCageResponse } from "../mocks/openCageResponse";
import { openWeatherResponse } from "../mocks/openWeatherResponse";

let axiosSpy, getPositionSpy;

describe("Weather.jsx", () => {

  beforeEach(() => {
    getPositionSpy = jest.spyOn(Weather.prototype, 'getPosition')
      .mockReturnValue({
        coords: {
          latitude: 59.4057181,
          longitude: 17.9298112
        }
      });

    axiosSpy = jest.spyOn(axios, "get")
      .mockResolvedValueOnce(openCageResponse)
      .mockResolvedValueOnce(openWeatherResponse)

    render(<Weather />);
  });

  it("is expected to call for position", () => {
    expect(getPositionSpy).toHaveBeenCalledTimes(1);
  });

  it("is expected to make 2 axios calls", () => {
    expect(axiosSpy).toHaveBeenCalledTimes(2);
  });

  it("is expected to render the city name", () => {
    expect(screen.getByText('You are in Stockholm')).toBeInTheDocument();
  });

  it("is expected to render temperature", () => {
    expect(screen.getByText('Your current temperature is 10°C')).toBeInTheDocument();
  });
});
