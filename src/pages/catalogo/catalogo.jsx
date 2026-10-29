import Navbar from "../../components/navbar/navbar";
import Cta from "../../components/cta/cta";
import Contact from "../../components/contact/contact";
import About from "../../components/about/about";
import Sizes from "../../components/sizes/sizes";
import SizeOrder from "../../components/sizeOrder/sizeOrder";
import HeroCarousel from "../../components/heroCarousel/heroCarousel";
import Footer from "../../components/footer/footer";
import Shirts from "../../components/shirts/shirts";

function Catalogo(){
    return (
        <main>  
            <Navbar />
            <HeroCarousel />
            <Shirts />
            <Sizes />
            <About />
            <Contact />




            <Footer />

        </main>

    );
}

export default Catalogo;