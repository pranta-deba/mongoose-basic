/* eslint-disable prettier/prettier */
import status from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

/* eslint-disable prettier/prettier */
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
    );
  }

  // checking if the semester is exists
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(status.NOT_FOUND, 'This academic semester not found !');
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(status.CONFLICT, 'This semester is already registered!');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
