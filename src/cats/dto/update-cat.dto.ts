import { PartialType } from '@nestjs/mapped-types';
import { RegisterCatDto } from './create-cat.dto';

export class UpdateCatDto extends PartialType(RegisterCatDto) {}
