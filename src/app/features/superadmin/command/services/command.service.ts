import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/api.constant';
import { ApiService } from '../../../shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(
    private apiService: ApiService
  ) { }

  commandList(): Observable<any> {
    let url = API_CONSTANT.command
    return this.apiService.get(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addCommand(data: any): Observable<any> {
    let url = API_CONSTANT.command
    return this.apiService.post(url, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCommand(data: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteCommand.replace('{id}', data.id)
    return this.apiService.patch(url, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCommand(id: any): Observable<any> {
    let url = API_CONSTANT.updateDeleteCommand.replace('{id}', id)
    return this.apiService.delete(url).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  commandDetails(data: any): Observable<any> {
    let url = API_CONSTANT.commandDetails
    return this.apiService.post(url, data).pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
