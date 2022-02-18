import { Component, OnInit } from "@angular/core";
import { Catalog } from "../../models/catalog.model";

@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {

    public products: string[];

    ngOnInit(): void {
        this.products = ['JABON LEON ALOE .350/20', 'TANG UVA 12/8 UD', 'AVENA 3 MIN. BOTE .400/36', '045 HARINAS', 'CHOCO MILK GDE. SOBRE .350/33'];
    }

}