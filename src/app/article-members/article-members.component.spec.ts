import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMembersComponent } from './article-members.component';

describe('ArticleMembersComponent', () => {
  let component: ArticleMembersComponent;
  let fixture: ComponentFixture<ArticleMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleMembersComponent]
    });
    fixture = TestBed.createComponent(ArticleMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
