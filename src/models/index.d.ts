import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Gallery {
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly path: string;
  readonly posts?: (Picture | null)[];
  constructor(init: ModelInit<Gallery>);
  static copyOf(source: Gallery, mutator: (draft: MutableModel<Gallery>) => MutableModel<Gallery> | void): Gallery;
}

export declare class Picture {
  readonly id: string;
  readonly title: string;
  readonly owner: string;
  readonly filepath: string;
  readonly Likecount: number;
  readonly gallery?: Gallery;
  readonly likes?: (Like | null)[];
  constructor(init: ModelInit<Picture>);
  static copyOf(source: Picture, mutator: (draft: MutableModel<Picture>) => MutableModel<Picture> | void): Picture;
}

export declare class Like {
  readonly id: string;
  readonly gallery?: Gallery;
  constructor(init: ModelInit<Like>);
  static copyOf(source: Like, mutator: (draft: MutableModel<Like>) => MutableModel<Like> | void): Like;
}