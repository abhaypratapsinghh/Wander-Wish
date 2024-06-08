import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { VscCheckAll } from "react-icons/vsc";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import {
  MdOutlineVilla,
  MdMicrowave,
  MdBalcony,
  MdYard,
  MdPets,
} from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld size={40} />,
  },
  {
    img: "../src/../src/assets/beach_cat.jpg",
    label: "Beachfront",
    icon: <TbBeach size={40} />,
    description: "This property is close to the beach!",
  },
  {
    img: "../src/assets/windmill_cat.webp",
    label: "Windmills",
    icon: <GiWindmill size={40} />,
    description: "This property is has windmills!",
  },
  {
    img: "../src/assets/modern_cat.webp",
    label: "Iconic cities",
    icon: <MdOutlineVilla size={40} />,
    description: "This property is modern!",
  },
  {
    img: "../src/assets/countryside_cat.webp",
    label: "Countryside",
    icon: <TbMountain size={40} />,
    description: "This property is in the countryside!",
  },
  {
    img: "../src/assets/pool_cat.jpg",
    label: "Amazing Pools",
    icon: <TbPool size={40} />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "../src/assets/island_cat.webp",
    label: "Islands",
    icon: <GiIsland size={40} />,
    description: "This property is on an island!",
  },
  {
    img: "../src/assets/lake_cat.webp",
    label: "Lakefront",
    icon: <GiBoatFishing size={40} />,
    description: "This property is near a lake!",
  },
  {
    img: "../src/assets/skiing_cat.jpg",
    label: "Ski-in/out",
    icon: <FaSkiing size={40} />,
    description: "This property has skiing activies!",
  },
  {
    img: "../src/assets/castle_cat.webp",
    label: "Castles",
    icon: <GiCastle size={40} />,
    description: "This property is an ancient castle!",
  },
  {
    img: "../src/assets/cave_cat.jpg",
    label: "Caves",
    icon: <GiCaveEntrance size={40} />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "../src/assets/camping_cat.jpg",
    label: "Camping",
    icon: <GiForestCamp size={40} />,
    description: "This property offers camping activities!",
  },
  {
    img: "../src/assets/arctic_cat.webp",
    label: "Arctic",
    icon: <BsSnow size={40} />,
    description: "This property is in arctic environment!",
  },
  {
    img: "../src/assets/desert_cat.webp",
    label: "Desert",
    icon: <GiCactus size={40} />,
    description: "This property is in the desert!",
  },
  {
    img: "../src/assets/barn_cat.jpg",
    label: "Barns",
    icon: <GiBarn size={40} />,
    description: "This property is in a barn!",
  },
  {
    img: "../src/assets/lux_cat.jpg",
    label: "Luxury",
    icon: <IoDiamond size={40} />,
    description: "This property is brand new and luxurious!",
  },
];

export const allTypes = [
  {
    name: "All types",
    icon: <VscCheckAll size={40} />,
    description: "Guests have all types available to choose from",
  },
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser size={40} />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill size={40} />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof size={40} />,
  },
];

export const facilities = [
  {
    name: "All",
    icon: <VscCheckAll size={40} />
  },
  {
    name: "Bath tub",
    icon: <PiBathtubFill size={40} />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap size={40} />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower size={40} />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher size={40} />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer size={40} />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill size={40} />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 size={40} />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill size={40} />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace size={40} />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow size={40} />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze size={40} />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera size={40} />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher size={40} />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid size={40} />,
  },
  {
    name: "Wifi",
    icon: <BiWifi size={40} />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet size={40} />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge size={40} />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave size={40} />,
  },
  {
    name: "Stove",
    icon: <GiToaster size={40} />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue size={40} />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach size={40} />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony size={40} />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire size={40} />,
  },
  {
    name: "Garden",
    icon: <MdYard size={40} />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar size={40} />,
  },
  {
    name: "Self check-in",
    icon: <FaKey size={40} />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets size={40} />,
  },
];
