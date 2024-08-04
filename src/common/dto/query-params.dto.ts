import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsInt()
  @Transform((page) => parseInt(page.value))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Transform((take) => parseInt(take.value))
  take: number = 10;

  @IsString()
  @IsOptional()
  sortBy: string = 'updatedAt';

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @IsArray()
  @Transform((search) => {
    if (search.value === undefined || !search.value) {
      return []; 
    } else if (typeof search.value === 'string') {
      return search.value.split(' '); 
    } else {
      return search.value; 
    }
  })
  search: string[] = [];

  @IsString()
  @IsOptional()
  statusType: string;
}