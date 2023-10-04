import moment from "moment";
import { FIXED_DECIMAL_POINT } from "./Constants";

export function convertToEngineeringUnit(number: number) {
  const units = ["", "k", "M", "G", "T", "P", "E"]; // Engineering unit prefixes
  let index = 0; // Index for the unit prefix

  // Loop until the number is within the range [1, 1000)
  while (number >= 1000 && index < units.length - 1) {
    number /= 1000;
    index++;
  }

  // Round the number to two decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Add the unit prefix to the rounded number
  const result = numberFormat(roundedNumber) + units[index];

  return result;
}

// Example usage
// * console.log(convertToEngineeringUnit(123)); // Output: 123
// * console.log(convertToEngineeringUnit(1234)); // Output: 1.23k
// * console.log(convertToEngineeringUnit(123456789)); // Output: 123.46M
// * console.log(convertToEngineeringUnit(9876543210)); // Output: 9.88G

export function makeCamelCase(string: string): string {
  return string
    .toLowerCase()
    .split(" ")
    .map((letter: string, index) =>
      index !== 0
        ? letter.charAt(0).toUpperCase() + letter.substring(1)
        : letter
    )
    .join("");
}

// Example usage
// * console.log(makeCamelCase("hello world")); // Output: helloWorld

export const percentageFormat = (value: number): string => {
  if (isNaN(value)) {
    return "Not a number";
  }

  const roundedValue = (value * 100).toFixed(FIXED_DECIMAL_POINT);
  const formattedValue = `${roundedValue}%`;

  return formattedValue;
};

export function numberFormat(num: number | string): string {
  let val = typeof num === "string" ? parseInt(num) : num || 0;

  return val.toFixed(FIXED_DECIMAL_POINT);
}

export function getStartAndEndDateFromWeek(yearWeek: string | number) {
  let yearWeekString = yearWeek.toString();
  const year = +yearWeekString.slice(0, 4);
  const week = +yearWeekString.slice(4);

  // Use moment.js to calculate the start and end dates
  const startDate = moment().year(year).isoWeek(week).startOf("isoWeek");
  const endDate = moment().year(year).isoWeek(week).endOf("isoWeek");

  // Format the dates as "YYYY-MM-DD"
  const startDateFormatted = startDate.format("YYYY-MM-DD");
  const endDateFormatted = endDate.format("YYYY-MM-DD");

  return { startDate: startDateFormatted, endDate: endDateFormatted };
}

// ! Example usage
// const yearWeek = "202306"; //* Assuming week 22 of 2023
// const { startDate, endDate } = getStartAndEndDateFromWeek(yearWeek);

// console.log("Start Date:", startDate); //* Output: Start Date: 2023-05-29
// console.log("End Date:", endDate); //* Output: End Date: 2023-06-04
