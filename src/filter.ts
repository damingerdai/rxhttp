import { RxRequest } from "./model";

export interface Filter {

    doFilter(request: RxRequest): void;
}

export class FilterChain implements Filter {

    private filters: Filter[];

    doFilter(request: RxRequest): void {
        if (this.filters && this.filters.length > 0) {
            this.filters.forEach(filter => filter.doFilter(request));
        }
    }

    addFilter(...filters: Filter[]): FilterChain {
        if (filters && filters.length > 0) {
            filters.forEach((filter) => this.filters.push(filter));
        }
        return this;
    }

    constructor() {
        this.filters = [];
    }
}

const filter: Filter = {
    doFilter: (request: RxRequest) => {
        console.log('test');
    }
}
const filterChain = new FilterChain();
filterChain.addFilter(filter);
