import { Component, signal, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MENU } from '../../constant/menu';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent  {
  openSubmenus = signal<Record<string, boolean>>({});
  selectedMenu = signal<string>('');
  selectedSubmenu = signal<string>('');
  menu:any =  MENU;
  userDetails: any;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.checkRouteAndSelectMenu(this.menu);
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRouteAndSelectMenu(this.menu);
    });
  }

  private checkRouteAndSelectMenu(menuItems: any[]) {
    const currentRoute = this.router.url;
    
    for (const item of menuItems) {
      if (item.subNav && item.subNav.length > 0) {
        for (const subItem of item.subNav) {
          if (currentRoute.includes(subItem.path)) {
            this.selectedMenu.set(item.name);
            this.selectedSubmenu.set(subItem.name);
            this.openSubmenus.update(prev => ({
              ...prev,
              [item.name]: true
            }));
            return;
          }
        }
      } else if (item.path && currentRoute.includes(item.path)) {
        this.selectedMenu.set(item.name);
        return;
      }
    }
  }


  toggleSubmenu(menu: string) {
    this.openSubmenus.update(prev => {
      const newState: Record<string, boolean> = {};
      for (const key in prev) {
        newState[key] = false;
      }
      newState[menu] = !prev[menu];
      return newState;
    });
  
    const menuItem = this.menu.find((m:any) => m.name === menu);
    if (!menuItem?.subNav?.length) {
      this.selectedMenu.set(menu);
      this.selectedSubmenu.set('');
    }
  }

  isSubmenuOpen(menu: string): boolean {
    return !!this.openSubmenus()[menu];
  }

  isMenuSelected(menuId: string): boolean {
  if (this.hasActiveChild(menuId)) return true;
    return this.selectedMenu() === menuId;
  }

  isSubmenuSelected(submenuId: string): boolean {
    return this.selectedSubmenu() === submenuId;
  }

  hasActiveChild(menuName: string): boolean {
    const menuItem = this.menu.find((m: any) => m.name === menuName);
    if (!menuItem?.subNav) return false;
    
    return menuItem.subNav.some((subItem:any) => 
      this.router.isActive(subItem.path, {
        paths: 'exact',
        queryParams: 'ignored',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })
    );
  }


}

