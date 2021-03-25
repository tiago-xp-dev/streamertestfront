import { Component } from '@angular/core';
import { AppService } from './app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Course';

  constructor(private AppService: AppService) { }
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
    this.AppService.getAllCourses().subscribe((data: any[]) => {
      this.data = data;
    })
  }

  deleteData(id) {
    this.AppService.deleteData(id).subscribe((response: boolean) => {
      this.getAllCourses();

      if (response)
        alert("Deletado com sucesso!");
      else
        alert("Não foi possível deletar, tenta novamente mais tarde!");
    })
  }

  save() {
    this.submitted = true;

    if (this.CourseForm.invalid) {
      return;
    }

    this.AppService.postData(this.CourseForm.value).subscribe(() => {
      this.resetForm();
      this.getAllCourses();
    })
  }

  update() {
    this.submitted = true;

    if (this.CourseForm.invalid) {
      return;
    }
    this.AppService.putData(this.CourseForm.value).subscribe((response: boolean) => {
      this.resetForm();
      this.getAllCourses();

      if (response)
        alert("Atualizado com sucesso!");
      else
        alert("Não foi possível atualizar, tenta novamente mais tarde!");
    })
  }

  editData(data) {
    this.AppService.getData(data.id).subscribe((course: any) => {
      
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
