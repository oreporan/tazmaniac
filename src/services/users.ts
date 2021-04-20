import {
  usernames,
  clientIdNums,
  clientNames,
  passwords,
  startTimes,
  days,
} from "../framework/env";
import User from "../entities/User";

const validateField = (expectedNumber: number, field?: string) => {
  if (field?.split(";").length !== expectedNumber)
    throw new Error(
      `users validation failed on field: ${field?.toString()}, expected ${expectedNumber} but got ${
        clientNames?.split(";").length
      }`
    );
};

const splitter = (raw: string) => raw.split(";");

const validateFields = (expectedNumber: number) => {
  validateField(expectedNumber, clientNames);
  validateField(expectedNumber, clientIdNums);
  validateField(expectedNumber, passwords);
  validateField(expectedNumber, startTimes);
  validateField(expectedNumber, days);
};

const getUsers = (): User[] => {
  if (!usernames)
    throw new Error("can not get users, missing usernames from env");
  const usernameList = usernames.split(";");
  const amountOfUsers = usernameList.length;
  validateFields(amountOfUsers);
  return usernameList.map(
    (username, i) =>
      new User(
        username,
        splitter(days!)[i].split(","),
        splitter(startTimes!)[i].split(","),
        splitter(passwords!)[i],
        splitter(clientIdNums!)[i],
        splitter(clientNames!)[i]
      )
  );
};

export default getUsers;
