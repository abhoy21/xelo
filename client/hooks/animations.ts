import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const initializeAnimations = () => {

  const cursor = document.querySelector('.custom-cursor') as HTMLElement;
  const moveCursor = (e: MouseEvent) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: 'power2.out',
    });
  };
  window.addEventListener('mousemove', moveCursor);


  const header = document.querySelector('header');
  if (header) {
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    );
  }


  const hero = document.querySelector('.hero');
if (hero) {
  const heroTl = gsap.timeline({ delay: 0.5 });


  heroTl
    .fromTo(hero.querySelector('h1'), 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(hero.querySelector('p'), 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
      "-=0.5"
    )
    .fromTo([hero.querySelector('button'), hero.querySelector('a')],
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 
      "-=0.5"
    );

  
}


  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      },
    );
  });


  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      },
    );
  });


  const cta = document.querySelector('section:last-of-type');
  if (cta) {
    gsap.fromTo(
      cta,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      },
    );
  }


  gsap.to('.bg-texture', {
    yPercent: 10,
    ease: 'linear',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });


  return () => {
    window.removeEventListener('mousemove', moveCursor);
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
};