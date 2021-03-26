import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from 'src/app/course/course.service'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent {
  title = 'Course';
  
  constructor(private CourseService: CourseService) { }
  data: any;
  CourseForm: FormGroup;
  submitted = false;
  EventValueString: any = "Salvar";
  EventValue: any = "save";

  ngOnInit(): void {
    this.getAllCourses();

    this.CourseForm = new FormGroup({
      id: new FormControl(0, [Validators.min(0)]),
      name: new FormControl("", [Validators.required]),
    })
  }
  getAllCourses() {
    this.CourseService.getAllCourses().subscribe((data: any[]) => {
      this.data = data;
    })
  }

  deleteData(id) {
    this.CourseService.deleteData(id).subscribe((response: boolean) => {
      this.getAllCourses();

      if (response)
        alert("Deletado com sucesso!");
      else
        alert("Não foi possível deletar, tente novamente mais tarde!");
    })
  }

  save() {
    this.submitted = true;

    if (this.CourseForm.invalid) {
      return;
    }

    this.CourseService.postData(this.CourseForm.value).subscribe(() => {
      this.resetForm();
      this.getAllCourses();
    })
  }

  update() {
    this.submitted = true;

    if (this.CourseForm.invalid) {
      return;
    }
    this.CourseService.putData(this.CourseForm.value).subscribe((response: boolean) => {
      this.resetForm();
      this.getAllCourses();

      if (response)
        alert("Atualizado com sucesso!");
      else
        alert("Não foi possível atualizar, tente novamente mais tarde!");
    })
  }

  editData(data) {
    this.CourseService.getData(data.id).subscribe((course: any) => {
      
      this.CourseForm.controls["id"].setValue(course.id);
      this.CourseForm.controls["name"].setValue(course.name);
      this.EventValueString = "Atualizar";
      this.EventValue = "update";
    });
  }

  resetForm() {
    this.CourseForm.reset();
    this.CourseForm.controls["id"].setValue(0);
    this.EventValue = "save";
    this.EventValueString = "Salvar";
    this.submitted = false;
  }
}
