import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { MatchesService } from 'src/app/services/matches/matches.service';
import { Match } from 'src/model/interfaces/match.interface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchComponent implements OnInit {
  id!: string;
  match: Match | undefined;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private matchesService: MatchesService,
    private globalsService: GlobalsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => (this.id = param.get('id') ?? '')
    );
    this.matchesService.getMatch(this.id).subscribe({
      next: (apiMatch) => {
        if (!apiMatch) {
          alert('El codigo no es valido');
          this.router.navigate(['../'], { relativeTo: this.route });
        }
        this.match = apiMatch;

        this.ref.markForCheck();
      },
      error: (err) => {
        console.error(err);

        alert('El codigo no es valido');
        this.router.navigate(['../', '../'], { relativeTo: this.route });
      },
    });
  }

  updatePoints(points: number) {
    const user = this.globalsService.getUser();

    this.matchesService
      .updatePlayerPoints(this.id, user.username, points)
      .subscribe(() => console.log('Se guardaron sus resultados'));

    const url = this.router.url.replace('jugar', 'ranking');

    this.router.navigateByUrl(url);
  }
}
