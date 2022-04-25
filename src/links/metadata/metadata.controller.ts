import { Controller, Get } from '@nestjs/common';
import { LinksType } from '../links-type.enum';

@Controller('links/metadata')
export class MetadataController {
  @Get('link-types')
  linkTypesMetadata() {
    return Object.values(LinksType);
  }
}
