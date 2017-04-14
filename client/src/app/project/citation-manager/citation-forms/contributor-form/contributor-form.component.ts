import { Component, OnInit, Output, EventEmitter } from '@angular/core';

const CONTRIBUTOR_TYPES = {
  author: 'Author',
  editor: 'Editor',
  compiler: 'Compiler',
  translator: 'Translator',
};

@Component({
  selector: 'rvn-contributor-form',
  templateUrl: 'contributor-form.component.html',
  styleUrls: ['contributor-form.component.scss']
})
export class ContributorFormComponent implements OnInit {

  @Output() publishContributor: EventEmitter<any> = new EventEmitter<any>();

  contributorTypes = CONTRIBUTOR_TYPES;
  contributorTypeList = [];

  constructor() { }

  ngOnInit() {
    this.contributorTypeList = Object.keys(this.contributorTypes)
      .map(contributorTypeKey => this.contributorTypes[contributorTypeKey]);
  }

  addContributor() {
    this.publishContributor.emit();
  }
}
