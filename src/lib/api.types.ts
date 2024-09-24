/**
 * A response from the Met Museum api /v1/search route
 *
 * @prop {number} total - the number of results returned, 0 or greater
 * @prop {number[]} objectIDs - the ids of all results associated with the
 * query. If there are no results, the array will be empty.
 */
export interface SearchResponse {
  /**The total nunmber of results returned. Must be 0 or greater.*/
  total: number;
  /** The array of object results for the given query. If there are no results
   * the array will be empty.*/
  objectIDs: number[] | null;
}

/**
 * A response from the Met Museum api /v1/objects route
 */
export interface ObjectsResponse {
  /** The numeric id of the object*/
  objectID: number;
  /** The URL for the full resolution image of the object. May be empty if the
   * image is not present. */
  primaryImage: string;
  /** The URL for the lower resolution image of the object. May be empty if the
   * image is not present. */
  primaryImageSmall: string;
  /** The title of the object */
  title: string;
  /** A string describing the date the given object originates from. Note: not
   * an actual date, rather a descriptive string (e.g: "roughly \<year>") */
  objectDate: string;
  /** The department responsible for the object. */
  department: string;
  /** A string describing the role of the artist the object is attributed to.
   * Ex: "Maker" */
  artistRole: string;
  /** The name of the artist the object is attributed to. */
  artistDisplayName: string;
  /** A string describing the nationality of the artist the object is attributed
   * to. Ex: "American"*/
  artistNationality: string;
  /** An array of tags describing the object. Null if empty. See ObjectTag type
   * for structure, but the data you want is probably the `term` field. */
  tags: ObjectTag[] | null;
  /** The url of the object's page on metmuseum.org */
  objectURL: string;
}

export interface ObjectTag {
  /** The tag */
  term: string;
  /** The link to the [Getty Research Institute art and architecture thesaurus](https://www.getty.edu/research/tools/vocabularies/aat/) page
   * for the given term*/
  AAT_URL: string;
  Wikidata_URL: string;
}
