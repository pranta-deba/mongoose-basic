/* eslint-disable prettier/prettier */
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester is created successfully.',
    data: result,
  });
});

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemestersIntoDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semesters are retrieved successfully.',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
};
