import Link from "next/link";
import React, { useState } from "react";
import { images as ImageSchema } from "../db/schema";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface HomeGalleryProps {
	images: (typeof ImageSchema.$inferSelect)[];
}

const HomeGallery = ({ images }: HomeGalleryProps) => {
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	return (
		<section id="gallery" className="page-content">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="headline">
							<h2>Gallerie</h2>
						</div>
						<div className="gallery-3colgrid-content">
							<div className="menu-holder menu-3col-grid-image gallery-holder clearfix">
								{images.slice(0, 3).map((image, index) => (
									<div
										className="menu-post gallery-post"
										key={index}
									>
										<div
											role="button"
											onClick={() => {
												setIndex(index);
												setOpen(true);
											}}
										></div>
										<div
											className="item-content-bkg gallery-bkg"
											onClick={() => {
												setIndex(index);
												setOpen(true);
											}}
										>
											<div
												className="gallery-img"
												style={{
													backgroundImage: `url(${image.url})`,
												}}
											></div>
											<div className="menu-post-desc">
												<h4>Galeriebild {index + 1}</h4>
												<div className="gallery-mglass">
													<i className="fas fa-search"></i>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div
							className="col-md-12 text-center"
							style={{ marginTop: "30px" }}
						>
							<p className="contact-btn">
								<Link href="/gallery" id="submit">
									Mehr sehen
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>

			{open && images.length > 0 && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					index={index}
					slides={images.map((img) => ({ src: img.url }))}
				/>
			)}
		</section>
	);
};

export default HomeGallery;
