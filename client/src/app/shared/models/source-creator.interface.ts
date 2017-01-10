import { EventEmitter } from '@angular/core';

import { Project } from './project.interface';
import { Source } from './source.interface';

/**
 * This interface serves to specify attributes required of a component which
 * performs the addition of sources to a particular projects through various
 * means.
 */
export interface SourceCreator {
  
  project: Project;
  created: EventEmitter<Source>;
  done: EventEmitter<boolean>;
  cancelled: EventEmitter<any>;
}