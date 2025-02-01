/* eslint-disable prettier/prettier */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.CreateAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/:facultyId',
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
