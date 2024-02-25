import React, { useEffect } from "react";
import ownerImg from "../assets/img32.png";
import developerImg from "../assets/developerImage.png";
import DesignerImg from "../assets/designerimage.png";
import editorImageabout from "../assets/editorAboutImage.png";

function About(): JSX.Element {
	useEffect(() => {
		document.title = "About - RewriterPro.ai";
	}, []);
	return (
		<div className="aboutmainparent">
			<div className="aboutbanner">
				<div className="content-about">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900">
						About Us
					</h2>
					<div className="custom_divider"></div>
					<dd className="mt-2 text-base text-gray-500 blacktext">
						{
							"Welcome to RewriterPro.Ai! This is our AI-powered rewriter tool for turning your text into professional content. Its creator is Kamran Khan. He wants to help people like writers, bloggers, students, and professionals. "
						}
					</dd>

					<dd className="mt-4 text-base text-gray-500 blacktext">
						<span>
							<b>Kamran</b>
						</span>
						{
							" saw a need for better content. He used his tech knowledge to build a tool that can change and create content fast. He saw a need for this in many jobs.							"
						}
					</dd>
				</div>
				<div className="aboutmainImage">
					<img src={ownerImg} alt="" />
				</div>
			</div>

			<div className="parentWhite">
				<div className="aboutbanner2">
					<div className="aboutmainImage">
						<img src={developerImg} alt="" />
					</div>
					<div className="content-about">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 colortext">
							About Us
						</h2>
						<h2 className="text-4xl font-bold tracking-tight text-gray-900">
							Developer
						</h2>
						<div className="custom_divider"></div>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{"Our team, led by Kamran Khan, "}
							<span>
								<b>developer: Jaimish Ashar </b>
							</span>
							{
								", Content by: Iram Ghafoor, and Designer Raheel Fida, is keen to provide an easy and enhanced experience."
							}
						</dd>

						<dd className="mt-4 text-base text-gray-500 blacktext">
							{
								"Kamran, Jaimish, and Ali all play big roles in making this tool work. They want it to be easy to use and make great content."
							}
						</dd>
					</div>
				</div>
			</div>

			<div className="parentBgblue">
				<div className="aboutbanner2 aboutbanner3">
					<div className="content-about">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 colortext">
							Designer
						</h2>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							Raheel Fida is the Website designer
						</h2>
						<div className="custom_divider"></div>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"Introducing Raheel Fida, the visionary creator behind RewriterPro.Ai. With a profound passion for web design, Raheel has meticulously developed an innovative platform that revolutionizes content creation."
							}
						</dd>
					</div>
					<div className="aboutmainImage">
						<img src={DesignerImg} alt="" />
					</div>
				</div>
			</div>

			<div className="aboutLastsection">
				<div className="aboutbanner3 aboutbanner4">
					<div className="content-about">
						<h2 className="text-2xl font-bold tracking-tight text-gray-900 colortext">
							AI Rewriter
						</h2>
						<h2 className="text-4xl font-bold tracking-tight text-gray-900">
							RewriterPro.Ai
						</h2>
						<div className="custom_divider"></div>
						<dd className="mt-2 text-base text-gray-500 blacktext">
							{
								"This tool is made to help people rewrite content with ease. It's for anyone who wants to transform content into more professional content. It uses AI to do this and lets you choose different options and tones. It can save you a lot of time. You can try it now!								"
							}
						</dd>
					</div>
					<div className="aboutmainImage">
						<img src={editorImageabout} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
