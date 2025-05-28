import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/api.constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private apiService: ApiService
  ) { }

  deviceListData(): Observable<any> {
    let url = API_CONSTANT.addDevice
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addDevice(payload: any): Observable<any> {
    let url = API_CONSTANT.addDevice
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  cpuListData(id:any): Observable<any> {
    let url = API_CONSTANT.cpuList.replace('{id}', id)
    return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


}
