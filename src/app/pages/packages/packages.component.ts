import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/app/models/package.model';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { PackagesService } from 'src/app/services/packages.service';

// Models


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  public packages: PackageModel[] = [];
  public loanding: boolean;

  constructor(private packagesService: PackagesService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loanding = true;

    // Get packages
    this.packagesService.getPackages(this.authService.getUser().username).subscribe((resp: PackageModel[]) => {
      this.packages = resp;
      this.loanding = false;
    });
  }

}
