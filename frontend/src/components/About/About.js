import "./About.css";
import slothLogo from "assets/teca_logo_dark_accent.png";
import slothLogo2 from "assets/teca_logo_light_accent.png";
import slothLogo3 from "assets/teca_logo_main_clr.png";
import slothLogo4 from "assets/teca_logo_light_shade.png";

export default function About() {
	return (
		<div className="About">
			<div className="about-us-title">
				<h1>About Us</h1>
			</div>
			<div className="about-us-hero">
				<div className="about-us-hero-text">
					<br />
					<br />
					<br />
					<p>
						Welcome to Teca! Here you can find new books to read and keep track
						of the ones you already love. You can also become part of the Teca
						community and help others find books by leaving amazing reviews.
					</p>
					<br />
					<p>
						We designed Teca with you, the user, in mind. We not only wanted to
						create a website where book lovers could go and discover new books,
						but we also wanted to provide our users with an amazing experience.
						From the colors all the way to our logo, we focused on providing a
						cozy feeling to our website, so that our users could feel like they
						were in an actual library when browsing through the website.
					</p>
					<br />
					<p>
						We are always welcoming feedback, so if there is anything you think
						needs improvement or if there is any feature you would like to see
						in the future, please feel free to go to our{" "}
						<a href="/contact">contact us </a> page and send us an email. We
						hope that you have a great time while you navigate through Teca!
					</p>
					<br />
					<p>
						A fun fact about our name is that Teca is short for biblioteca,
						which means library in Spanish!
					</p>
				</div>
				<img alt="Teca Logo" src={slothLogo3} />
			</div>
		</div>
	);
}
