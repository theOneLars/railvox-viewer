import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {Parser} from 'xml2js';

@Component({
  selector: 'app-railvox-parser',
  templateUrl: './railvox-parser.component.html',
  styleUrls: ['./railvox-parser.component.css']
})
export class RailvoxParserComponent implements OnInit {

  public xmlItems: any;

  constructor(private http: HttpClient) {
    // this.loadXML();
  }

  // //getting data function
  // loadXML(): void {
  //   /*Read Data*/
  //   this.http.get('assets/users.xml',
  //     {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'text/xml')
  //         .append('Access-Control-Allow-Methods', 'GET')
  //         .append('Access-Control-Allow-Origin', '*')
  //         .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
  //       responseType: 'text'
  //     })
  //     .subscribe((data) => {
  //       this.parseXML(data)
  //         .then((data: any) => {
  //           this.xmlItems = data;
  //           console.log(this.xmlItems);
  //         });
  //     });
  //   /*Read Data*/
  // }
  //
  // //store xml data into array variable
  // parseXML(data: string): any {
  //   return new Promise(resolve => {
  //     var k: string | number,
  //       arr: any[] = [],
  //       parser = new Parser(
  //         {
  //           trim: true,
  //           explicitArray: true
  //         });
  //     parser.parseString(data, function (err: any, result: any) {
  //       var obj = result.Employee;
  //       for (k in obj.emp) {
  //         var item = obj.emp[k];
  //         arr.push({
  //           id: item.id[0],
  //           name: item.name[0],
  //           email: item.email[0],
  //
  //         });
  //       }
  //       resolve(arr);
  //     });
  //   });
  // }

  ngOnInit(): void {
  }

}
