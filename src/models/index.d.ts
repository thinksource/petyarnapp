import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Picture {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly owner: string;
  readonly filepath: string;
  readonly likecount: number;
  constructor(init: ModelInit<Picture>);
  static copyOf(source: Picture, mutator: (draft: MutableModel<Picture>) => MutableModel<Picture> | void): Picture;
}