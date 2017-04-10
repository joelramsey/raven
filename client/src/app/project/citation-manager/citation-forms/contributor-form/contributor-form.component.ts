import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Contributor } from '../../../../shared/models/index';

const CONTRIBUTOR_TYPES = {
  author: 'Author',
  editor: 'Editor',
  compiler: 'Compiler',
  translator: 'Translator',
};

@Component({
  selector: 'rvn-contributor-form',
  templateUrl: './contributor-form.component.html',
  styleUrls: ['./contributor-form.component.scss']
})
export class ContributorFormComponent implements OnInit {

  @Input() contributor: Contributor;
  @Output() publishContributor: EventEmitter<any> = new EventEmitter<any>();

  contributorTypes = CONTRIBUTOR_TYPES;
  contributorTypeList = [];

  constructor() {
  }

  ngOnInit() {

    if (!this.contributor) {
      this.contributor = {
        'function': 'author',
        'first': '',
        'middle': '',
        'last': ''
      };
    }

    this.contributorTypeList = Object.keys(this.contributorTypes)
      .map(contributorTypeKey => {
        return {
          value: contributorTypeKey,
          name: this.contributorTypes[contributorTypeKey]
        };
      });
  }

  addContributor() {
    this.publishContributor.emit(this.contributor);
  }
}
