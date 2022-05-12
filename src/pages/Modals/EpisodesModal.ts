export type EpisodesApiResponse = {
    info: EpisodeInfo;
    results: Episode;
}

export type EpisodeInfo = {
    count: number;
    pages: number;
    next:string;
    prev:number;
}

export type Episode = {
    id:number;
    name:string;
    // eslint-disable-next-line camelcase
    air_date:string;
    episode:string;
    characters:string[];
    url:string;
    created:string;
}
