import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(status.NOT_FOUND, 'This department is already exist!');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function name(next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findById(query);
  if (!isDepartmentExists) {
    throw new AppError(status.NOT_FOUND, 'This department dose not exist!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
