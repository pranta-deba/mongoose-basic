import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.zod.validation';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students are retrieved successfully.',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is retrieved successfully.',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is deleted successfully.',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is updated successfully.',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
