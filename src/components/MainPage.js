import { NavBar } from "./NavBar";
import { Banner } from "./Banner";
import { About } from "./About";
import { Review } from "./Review";
import { Lessons } from "./Lessons";
import { Exams } from "./Exams";
import { Licenses } from "./Licenses";
import { Contact } from "./Contact";

export default function MainPage(){
    return (
        <div>
            <NavBar/>
            <Banner />
            <About />
            <Review />
            <Lessons />
            <Exams />
            <Licenses />
            <Contact />
        </div>
    );
}