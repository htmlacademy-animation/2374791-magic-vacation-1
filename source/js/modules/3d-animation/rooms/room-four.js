import * as THREE from "three";
import {RoomScene} from "./room";
import {MATERIAL_TYPE, OBJECT_ELEMENTS, SVG_ELEMENTS} from "../../../helpers/constants";
import {MaterialCreator} from "../material-creator";
import {Saturn} from '../3d-objects/saturn';
import {Carpet} from '../3d-objects/carpet';

export class RoomFourScene extends RoomScene {
  constructor(pageSceneCreator) {
    super(pageSceneCreator);

    this.wall = {
      name: OBJECT_ELEMENTS.wallCorner,
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.BasicMaterial,
          {
            color: MaterialCreator.Colors.ShadowedPurple,
            side: THREE.DoubleSide,
          }
      ),
    };
    this.floor = {
      material: this.pageSceneCreator.materialCreator.create(
          MATERIAL_TYPE.SoftMaterial,
          {
            color: MaterialCreator.Colors.ShadowedDarkPurple,
          }
      ),
    };
    this.staticOutput = {
      name: OBJECT_ELEMENTS.staticOutput4,
    };

    this.constructChildren();
  }

  constructChildren() {
    super.constructChildren();

    this.addFlower();
    this.addDarkSaturn();
    this.addCarpet();
    this.addSonya();
  }

  addFlower() {
    const config = {
      name: SVG_ELEMENTS.flower,
      extrude: {
        depth: 4,
        bevelThickness: 2,
        bevelSize: 2,
        material: this.pageSceneCreator.materialCreator.create(
            MATERIAL_TYPE.SoftMaterial,
            {
              color: MaterialCreator.Colors.ShadowedAdditionalPurple,
            }
        ),
      },
      transform: {
        transformX: 60,
        transformY: 410,
        transformZ: 440,

        rotateX: Math.PI,
        rotateY: -Math.PI / 2,

        scale: 1,
      },
    };

    this.pageSceneCreator.createExtrudedSvgMesh(config, (obj) => {
      this.addObject(obj);
    });
  }

  addDarkSaturn() {
    const saturn = new Saturn(this.pageSceneCreator.materialCreator, {
      darkMode: true,
      withRope: true,
    });

    const transform = {
      transformX: 350,
      transformY: 500,
      transformZ: 280,

      rotateY: -Math.PI / 2,

      scale: 1,
    };

    this.pageSceneCreator.setTransformParams(saturn, transform);

    this.addObject(saturn);
  }

  addCarpet() {
    const carpet = new Carpet(this.pageSceneCreator);

    this.addObject(carpet);
  }

  addSonya() {
    this.pageSceneCreator.createObjectMesh(
        {
          name: OBJECT_ELEMENTS.sonya,
          transform: {
            transformX: 440,
            transformY: 120,
            transformZ: 280,
          },
        },
        (obj) => {
          this.addObject(obj);
        }
    );
  }
}
