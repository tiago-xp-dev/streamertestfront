import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';
import { CourseService } from 'src/app/course/course.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent {
  title = 'Project';

  constructor(private ProjectService: ProjectService, private CourseService: CourseService) { }
  data: any;
  dataCourses: any;
  ProjectForm: FormGroup;
  submitted = false;
  selectedCourse = null;
  EventValueString: any = "Salvar";
  EventValue: any = "save";

  ngOnInit(): void {
    this.getCourses();
    this.loadTable();

    this.ProjectForm = new FormGroup({
      id: new FormControl(0, [Validators.min(0)]),
      image: new FormControl(''),
      name: new FormControl(null, [Validators.required]),
      why: new FormControl(''),
      what: new FormControl(''),
      whatWillWeDo: new FormControl(''),
      projectStatus: new FormControl(null, [Validators.required]),
      course: new FormGroup({
        id: new FormControl(0),
        name: new FormControl(''),
      }),
      courseId: new FormControl(null, [Validators.required]),
    })

    this.ProjectForm.get("courseId").valueChanges.subscribe((id) => {
      this.selectedCourse = id;
      this.loadTable();
    });
  }

  getCourses() {
    this.CourseService.getAllCourses().subscribe((data: any[]) => {
      this.dataCourses = data;
    });
  }

  getByCourseId(id) {
    this.ProjectService.getByCourseId(id).subscribe((data: any[]) => {
      this.data = data;
    })
  }

  deleteData(id) {
    this.ProjectService.deleteData(id).subscribe((response: boolean) => {
      this.getByCourseId(this.selectedCourse);

      if (response)
        alert("Deletado com sucesso!");
      else
        alert("Não foi possível deletar, tente novamente mais tarde!");
    })
  }

  save() {
    this.submitted = true;

    console.log(this.ProjectForm.value);

    if (this.ProjectForm.invalid) {
      return;
    }

    if (this.ProjectForm.value.courseId !== null)
      this.ProjectForm.value.courseId = Number(this.ProjectForm.value.courseId);

    if (this.ProjectForm.value.projectStatus !== null)
      this.ProjectForm.value.projectStatus = Number(this.ProjectForm.value.projectStatus);

    this.ProjectService.postData(this.ProjectForm.value).subscribe(() => {
      this.getByCourseId(this.selectedCourse);
      this.resetForm();
    })
  }

  update() {
    this.submitted = true;

    if (this.ProjectForm.invalid) {
      return;
    }

    if (this.ProjectForm.value.courseId !== null)
      this.ProjectForm.value.courseId = Number(this.ProjectForm.value.courseId);

    if (this.ProjectForm.value.projectStatus !== null)
      this.ProjectForm.value.projectStatus = Number(this.ProjectForm.value.projectStatus);

      console.log(this.ProjectForm);

    this.ProjectService.putData(this.ProjectForm.value).subscribe((response: boolean) => {
      this.resetForm();
      this.getByCourseId(this.selectedCourse);

      if (response)
        alert("Atualizado com sucesso!");
      else
        alert("Não foi possível atualizar, tente novamente mais tarde!");
    })
  }

  editData(data) {
    this.ProjectService.getById(data.id).subscribe((project: any) => {
      this.ProjectForm.controls["id"].setValue(project.id);
      this.ProjectForm.controls["name"].setValue(project.name);
      this.ProjectForm.controls["what"].setValue(project.what);
      this.ProjectForm.controls["whatWillWeDo"].setValue(project.whatWillWeDo);
      this.ProjectForm.controls["why"].setValue(project.why);
      this.ProjectForm.controls["projectStatus"].setValue(project.projectStatus);
      this.ProjectForm.controls["image"].setValue(project.image);
      this.ProjectForm.controls["courseId"].setValue(project.courseId);
      this.ProjectForm.value.course.id = project.course.id;
      this.ProjectForm.value.course.name = project.course.name;
      
      this.EventValueString = "Atualizar";
      this.EventValue = "update";
    });
  }

  resetForm() {
    let previousCourse = this.selectedCourse;

    this.ProjectForm.reset();
    this.ProjectForm.controls["id"].setValue(0);
    this.ProjectForm.controls["name"].setValue(null);
    this.ProjectForm.controls["what"].setValue('');
    this.ProjectForm.controls["whatWillWeDo"].setValue('');
    this.ProjectForm.controls["why"].setValue('');
    this.ProjectForm.controls["projectStatus"].setValue(null);
    this.ProjectForm.controls["image"].setValue('');
    this.EventValue = "save";
    this.EventValueString = "Salvar";
    this.submitted = false;

    this.selectedCourse = previousCourse;
    this.ProjectForm.controls["courseId"].setValue(this.selectedCourse);
  }

  loadTable() {
    if (this.selectedCourse != null) {
      this.getByCourseId(this.selectedCourse);
    }
  }
}
