import React, { useEffect, useState } from 'react'

import styles from '../styles/ProductCard.module.scss'

// fontawesome for icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import 'animate.css';

// Toast
import toast from 'react-hot-toast';

// icons
import categoryIcon from '../assets/icons/category.svg'
import starIcon from '../assets/icons/star.svg'
import sortIcon from '../assets/icons/sorting.svg'
import { connect } from 'react-redux'

export default function ProductCard(props) {
    const { product } = props;
    const [showDescription, setShowDescription] = useState(false);
    const [ hide, setHide ] = useState(false);
    // for action buttons
    const [addHover, setAddHover] = useState(false);
    const [menuExpand, setMenuExpand] = useState(false);

    // for animation
    const [animate, setAnimate] = useState(false);

    
   



    return (
        <div className={` ${styles.container} animate__animated animate__fadeIn`}>
            <div className={styles.overlay}>
                

                <div
                    className={`animate__animated animate__faster ${
                        styles.menuExpanded
                    } ${!menuExpand ? styles.hideMenu : ' animate__zoomIn'}
                    ${animate ? ' animate__zoomOut' : ''}`}
                >
                    <p className={styles.likeButton}><FontAwesomeIcon icon={faHeart} /> Like</p>
                    <div className={styles.border}></div>
                    <p  className={styles.editButton}><FontAwesomeIcon icon={faPenToSquare} /> Edit</p>
                    <div className={styles.border}></div>
                    <p  className={styles.deleteButton}><FontAwesomeIcon icon={faTrash} /> Delete</p>
                    
                </div>

                <div className={styles.image}>
                    <img src={product.images[0]} alt="" />
                </div>

                <div className={styles.details}>
                    <div className={styles.heading}>
                        
                        <p className={styles.category}> <img src={categoryIcon} alt="" /> {product.category}</p>
                        <p className={styles.rating}> 4 / 5 <img src={starIcon} alt="" /> </p>

                    </div>
                    <p className={styles.name}> {product.productName.substring(0, 20)} </p>
                    <p className={styles.price}> ${product.MRP} </p>
                </div>

                <div className={styles.actions}>
                    <button  className={styles.addToCart}
                        onMouseEnter={() => setAddHover(!addHover)}
                        onMouseLeave={() => setAddHover(!addHover)}
                        
                        >
                        <FontAwesomeIcon icon={faBagShopping} /> Add to Bag
                    </button>


                </div>

                <div className={`animate__animated ${styles.descriptionOverlay} ${!showDescription ? ' animate__flipOutX' : ' animate__flipInX'} ${!hide ? styles.hide : ''}`}>
                    <p className={styles.description}> Description</p>
                </div>

                <div className={styles.seeDetailsButton}>
                    <p>See Details &nbsp; 
                        <FontAwesomeIcon icon={!showDescription ? faChevronDown : faChevronUp} 
                            className={`animate__animated  ${showDescription ? 'animate__flipInX' : ''} `} /> 
                    </p>
                </div>
            </div>

            

        </div>
    )
}


