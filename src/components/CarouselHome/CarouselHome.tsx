import { Carousel } from "react-bootstrap"


const CarouselHome = () => {
    return (
        <Carousel>

            <Carousel.Item>
                <img className="d block w-100" style={{ maxHeight: "500px", objectFit: 'cover' }} src="/assets/images/post_thumbnail-4efabca9bd56b38edc0058c4ba006481.jpeg" alt="slide3" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d block w-100" style={{ maxHeight: "500px", objectFit: 'cover' }} src="/assets/images/istockphoto-943067460-612x612.jpg" alt="slide3" />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img className="d block w-100" style={{ maxHeight: "500px", objectFit: 'cover' }} src="https://images.pexels.com/photos/19022735/pexels-photo-19022735/free-photo-of-mano-camara-flores-telefono-inteligente.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    )
}

export default CarouselHome